class Form
{

    formObj = {};

    indexToChar(index)
    {
        return String.fromCharCode(65 + index);
    }


    idGenerator()
    {
        let id = [];

        for(let i = 0; i < 5; i++)
        {
            const randomNumber = Math.floor(Math.random() * 10);
            id.push(randomNumber);
        }

        return id.join('');
    }

    create()
    {
        const countInputs = document.querySelectorAll('.form-wrapper').length;
        const targetEl = document.getElementById('generate-form');
        const charCapital = this.indexToChar(countInputs);
        let inputId = `${this.indexToChar(countInputs)}${this.idGenerator()}`;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-wrapper';
        wrapper.dataset.id = inputId;
        

        wrapper.innerHTML = `
                                <label for="task-form-${inputId}" class="label-task">Task ${charCapital}: </label>
                                <input type="text" class="input-task" id="task-form-${inputId}" name="task-form" placeholder="type task" data-id="${inputId}">
                                <label for="hour-form-${inputId}" class="label-hour">Hour: </label>
                                <input type="number" class="input-hour" id="hour-form-${inputId}" name="hour-form-${inputId}" data-id="${inputId}" placeholder="type hour" min="0" max="8">
                                <button type="button" class="remove-task-btn" aria-label="Remove Task-Fomular Button" role="button" data-id="${inputId}"></button>
                              `

        targetEl.appendChild(wrapper);                
    }

    remove(event)
    {
        const target = event.target;
        const isTargetHTML = target instanceof HTMLElement;
        if(!isTargetHTML) return;

        const formInputParents = document.querySelectorAll('.form-wrapper');
        formInputParents.forEach(parent => 
        {
            const isParentHTML = parent instanceof HTMLElement;
            if(!isParentHTML) return;

            const doesIdMatch = parent.dataset.id === target.dataset.id;
            if(!doesIdMatch) return;

            parent.remove();
        });
    }

    getTaskAndHourData(task, hour)
    {
        const hourInputs = document.querySelectorAll(hour);
        const taskInputs = document.querySelectorAll(task);

        taskInputs.forEach(taskInput =>
        {
            hourInputs.forEach(hourInput =>
            {
                const doesIdMatch = taskInput.dataset.id === hourInput.dataset.id;
                if(!doesIdMatch) return;

                this.formObj[taskInput.dataset.id] = {task: taskInput.value, hour: hourInput.value};
            });
        });
    }


    sort()
    {
        const hour = '.input-hour';
        const task = '.input-task';
        this.getTaskAndHourData(task, hour);


        const entries = Object.values(this.formObj);
        const taskFormInputs = document.querySelectorAll('.form-wrapper');
        const countInputs = taskFormInputs.length;
        taskFormInputs.forEach(input =>
        {
            input.remove();
        });

        for(let i = 0; i < countInputs; i++)
        {
            this.create();
        }

        const hourInputs = document.querySelectorAll(hour);
        const taskInputs = document.querySelectorAll(task);
        
        entries.forEach((entry, index) =>
        {
            taskInputs[index].value = entry.task ?? '';
            hourInputs[index].value = entry.hour ?? '';
        });


        this.formObj = {};
    }
}


const form = new Form();
export default form;

