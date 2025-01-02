"use client";
import { useEffect, useMemo, useState } from "react";
import PlusIcon from "./icons/PlusIcon";
import { Column, Id, Task } from "./types";
import ColumnContainer from "./ColumnContainer";
import Modal from "../../components/Modal";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import {
  deletarTarefa,
  editarStatusTarefa,
  listarTarefas,
} from "../../services/api";

function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // uso de função async para chamar função apenas uma vez, sem função async estava chamando duas vezes
      const resp = await listarTarefas();
      setTasks(resp.data);
    };

    fetchData();
  }, []);

  const [columns, setColumns] = useState<Column[]>([
    { id: "TODO", title: "TODO" },
    { id: "DOING", title: "DOING" },
    { id: "DONE", title: "DONE" },
  ]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 30,
      },
    })
  );

  return (
    <div
      className="
    m-auto
    flex
    min-h-screen
    w-full
    items-center 
    overflow-x-auto
    overflow-y-hidden
    px-[40px]"
    >
      <Modal />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.status === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.status === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          window.document.body
        )}
      </DndContext>
    </div>
  );

  function createTask(status: Id) {
    const newTask: Task = {
      id: generateId(),
      status,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task._id !== id);
    console.log(id);
    const resp = await deletarTarefa(id);
    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.status !== id);
    setTasks(newTasks);
  }

  function updateTask(id: Id, content: string) {
    const newTask = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTask);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  }

  async function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activestatus = active.id;
    const overstatus = over.id;

    await editarStatusTarefa(active.id, over.data.current.task.status);

    if (activestatus === overstatus) return;
    console.log(active.id);

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activestatus
      );

      const overColumnIndex = columns.findIndex((col) => col.id === overstatus);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return;

    //Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        const overIndex = tasks.findIndex((t) => t._id === over.id);
        tasks[activeIndex].status = tasks[overIndex].status;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    //Iam dreopping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t._id === activeId);
        tasks[activeIndex].status = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
