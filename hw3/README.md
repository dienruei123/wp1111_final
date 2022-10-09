# Web Programming HW#3

###### Author: b10901038 吳典叡

### Run Program

Download node_modules: `npm install`  
Run: `npm start` or `yarn start`

## Basic features

1. Footer won't appear initially, while input bar is presented for user to input.
2. Add todo-item by pressing `Enter`; added todo-item appears to be active(unfinished).
3. Checkbox will be green once the todo-item is completed; when the user click on the checkbox agin, todo-item will become active(i.e. checkbox will be gray).
4. Footer will appear once user has input todo-items; number of remaining active tasks will be shown in the left of the footer.

## Advanced features

1. Click on 'X' in the right of the todo-item, then the todo-item will be deleted; if the deleted todo-item is active, then the number of remaining active tasks will be decremented by 1.
2. Footer will become invisible once all todo-items are deleted.
3. Click on `Active` button or `Completed` button, then only "Active" or "Completed" todo-items are shown. Click on `Add` button, then all todo-items will be shown.
   - If all tasks are completed, footer will still appear when click on `Active` button, while there are no current active todo-items.
4. `Clear completed` button appears only if there exists completed todo-items; click on it, then all completed todo-items will be deleted(the button will disappear of course).

## Additional features

1. Show current sorting mode by adding a black border to corresponding button(e.g. when sorting in "Completed" mode, a black border will be around `Complete` button)
2. When sorting in "Complete" mode, show number of completed tasks instead of remaining active tasks.
3. Change a little bit css to fix footer buttons to the center(originally, if the `Clear completed` button is invisible, footer buttons will align to the right).
