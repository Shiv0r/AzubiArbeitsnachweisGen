class Form
{
    count = 0;

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
        const targetEl = document.getElementById('generate-form');
        let charCapital = `${this.indexToChar(this.count)}${this.idGenerator()}`;

        targetEl.innerHTML += `
                                <div class="form-wrapper" data-id="${charCapital}">
                                    <label for="task-form-${charCapital}" class="label-task">Task: </label>
                                    <input type="text" class="input-task" id="task-form-${charCapital}" name="task-form" placeholder="type task" data-id="${charCapital}">
                                    <label for="hour-form-${charCapital}" class="label-hour">Hour: </label>
                                    <input type="number" class="input-hour" id="hour-form-${charCapital}" name="hour-form-${charCapital}" data-id="${charCapital}" placeholder="type hour" min="0" max="8">
                                    <button type="button" class="remove-task-btn" aria-label="Remove Task-Fomular Button" role="button" data-id="${charCapital}"></button>
                                </div>
                              `
        this.count++
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
            this.count--;
        });
    }

    sort()
    {
        const taskFormInputs = document.querySelectorAll('.form-wrapper');
        this.count = taskFormInputs.length;
        taskFormInputs.forEach(input =>
        {
            input.remove();
        });

        for(let i = 0; i < this.count; i++)
        {
            this.create()
        }
    }
}


const form = new Form();
export default form;

