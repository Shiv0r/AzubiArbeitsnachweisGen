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
        let charCapital = `${this.indexToChar(countInputs)}${this.idGenerator()}`;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-wrapper';
        wrapper.dataset.id = charCapital;
        

        wrapper.innerHTML = `
                                <label for="task-form-${charCapital}" class="label-task">Task: </label>
                                <input type="text" class="input-task" id="task-form-${charCapital}" name="task-form" placeholder="type task" data-id="${charCapital}">
                                <label for="hour-form-${charCapital}" class="label-hour">Hour: </label>
                                <input type="number" class="input-hour" id="hour-form-${charCapital}" name="hour-form-${charCapital}" data-id="${charCapital}" placeholder="type hour" min="0" max="8">
                                <button type="button" class="remove-task-btn" aria-label="Remove Task-Fomular Button" role="button" data-id="${charCapital}"></button>
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

