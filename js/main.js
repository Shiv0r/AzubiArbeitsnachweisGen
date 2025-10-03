import form from "./createFormTask.js";


document.addEventListener('click', event =>
{

    
    const target = event.target
    const isTargetHtml = target instanceof HTMLElement;
    if(!isTargetHtml) return;

    

    const isAddTaskButtonClicked = target.matches('.add-task-btn');
    if(isAddTaskButtonClicked)
    {
        form.create();
    }
   
  
    const isRemoveTaskButtonClicked = target.matches('.remove-task-btn');
    if(isRemoveTaskButtonClicked)
    {
        form.remove(event);
        form.sortId();
    }

});

