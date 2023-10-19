This is a repo for React dev test task.

Task statement:

Create a React JS application that shows a list of 7 numbered checkboxes at the beginning. 
Each checkbox serves as a toggle for displaying a component. 
As new components are added, they appear at the end of the displayed list. 
The components (240x240 pixels) retrieve data from https://navirego-interview-kcwjvs7ug-volodymyr-matselyukh.vercel.app/api/letters/{checkbox_number} every 2 seconds, where each component displays a letter from this data. checkbox_numbers go from 0 to 6.
The API serves 7 different texts depending on the checkbox number. Each component should display the last 30 letters. The application should be responsive, with a minimum resolution of 800x600 pixels. TypeScript, the newest version of React, and preprocessed(scss/less) (and nice to eye) CSS are preferred.

Sometimes api returns unexpected responses. You should propose a way of handling such situation.

Time for the task ~6 hours. Commit your changes to git repo and send a link to it.

Good luck!