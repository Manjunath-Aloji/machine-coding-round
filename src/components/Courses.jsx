import { useState } from "react";
import Page from "./Page";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import courses from "../utils/courses";
import dragIcon from "../assets/drag_indicator.svg";
import more from "../assets/more_vert.svg";

const Courses = () => {
  const [items, setItems] = useState(courses);
  const [openIndex, setOpenIndex] = useState(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(items);
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);

    setItems(updatedItems);
  };

  const moveToTop = (index) => {
    if (index === 0) return;
    const updatedItems = Array.from(items);
    const [item] = updatedItems.splice(index, 1);
    updatedItems.unshift(item);
    setItems(updatedItems);
  };

  const moveToBottom = (index) => {
    if (index === items.length - 1) return;
    const updatedItems = Array.from(items);
    const [item] = updatedItems.splice(index, 1);
    updatedItems.push(item);
    setItems(updatedItems);
  };

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-9/12 p-10 rounded-md bg-white flex flex-col items-center justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div 
                      className="flex items-center p-4 rounded-md my-1 border border-slate-600 bg-white shadow relative"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="w-6 h-6 mr-4" {...provided.dragHandleProps}>
                        <img src={dragIcon} alt="drag" />
                      </div>
                      <div className="w-28 h-10 md:h-16 object-cover rounded-md mr-4">
                        <img src={item.thumbnail} alt={item.name} />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">{item.name}</div>
                      </div>
                      <div className="w-24 text-sm text-gray-600 mr-4">
                        {item.price !== 0 ? `Rs. ${item.price}/-` : 'Free'}
                      </div>
                      <div className="w-24 text-sm text-gray-500 mr-4 "><span className="bg-[#DBFFCE] p-1 rounded-sm">{item.type}</span></div>
                      <div className="w-6 h-6 relative">
                        <img 
                          src={more} 
                          alt="more" 
                          className="cursor-pointer"
                          onClick={() => toggleMenu(index)} 
                        />
                        {openIndex === index && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => { moveToTop(index); setOpenIndex(null); }}
                            >
                              Move to Top
                            </button>
                            <button 
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              onClick={() => { moveToBottom(index); setOpenIndex(null); }}
                            >
                              Move to Bottom
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

const CoursesComponent = Page(Courses, 'bg-[#D2E3C8]', 'text-[#4F6F52]');

export default CoursesComponent;
