## Roadmap

## General Functionality 
- [ ] Add ability to remove syllabi
- [ ] Make the CS571 under a "load demo option" 
- [ ] Make backend spit out related policies. e.g., under grading would be a late policy or drop policy
- [ ] Should Probably make it so you can view the full pdf the user uploaded somewhere.
- [ ] I don't think the current backend actually extracts the school. This is pretty important if this application can be used outside of UW-Madison. 


## Specific Tabs
### Overview 
- [ ] Should probably add a "summarized by AI" under course summary and what you will learn. The disclaimer should probably say something like "AI can make mistakes" 
    - [ ] Under this maybe a button that says "See full unsummarized course content" which the backend extracts anyway
- [ ] Table of Contents where the user will be able to find what they need where


### Grading 
- [ ] Implement "What-If Grade" option 
- [ ] Implement mad grades (will probably mostly be for a UW-Madison exclusive thing though)
    - [ ] We could maybe use the rate my prof  

### Calendar
- [ ] Calendar should probably include the attendence policy 
- [ ] Add "Add" to calendar button. This should not be too hard. Adding contact integration was easy
- [ ] A Schedule including each day of the week and what is on each day. Would include:
    - [ ] Office hours 
    - [ ] Lectures
    - [ ] Assignments
        - e.g., monday: homework due 11:59
        - or e.g., Tuesday: Readings due
- [ ] Flag heavier weeks? Look through the calendar and see where there is a lot schedule and do some sort of warning maybe 


### Staff
- [ ] Rate my professor integration (?)
- [ ] Could we geocode the location and make it so you can map your way there? 
    - [ ] You can create dynamic Google Maps or Apple Maps links that automtically search things (e.g., searching "Sewell") I wonder if then we would want to extract the school name for that information.
- [ ] Ability to add office hours to calendar 

### More
- More can probably become a drop down menu with: 
    - [ ] Academic Integrity Policy 
    - [ ] Course Resources 
    - [ ] Additional Notes 


## UX/UI Elements
- [ ] Probably replace "Syllabus Analyzer" text with "my courses" or something 
- [ ] Add a splash scren if its the first time the user has opened the application with a big "Upload a Syllabus" or "Load a Demo"
- [ ] Add many more icons for the design.
    - [ ] "Add to contacts" can be an icon 
    - [ ] "Add to calendar" can be an icon 
    - [ ] Add icon in front of email
    - [ ] Add icons to the tabs 
    - [ ] Add color (espeicially for a late policy or something important)
- [ ] Overall the design is pretty bad and dated. Got to figure out how to make it look more modern 



## More Abitious Ideas (In order of ambition)
- [ ] Adding accounts so users can log in and have thier data stored 
- [ ] An option to export an easily referencable syllabus with the most important info (but is this redudant?)
- [ ] "Chat with Syllabus" bot. Ask questions of an AI chat bot that has all the info of the syllabus. Might not be too challenging using the preexisting backend, however might be slow with current funcitonality. 
- [ ] I even wonder if we could do like an "upload additional information" or something where you could upload a canvas page or something. So in case there is a schedule on the canvas page or something. Hmmmmmmm. I wonder what would happen if you just combined those into a full "syllabus" what would happen with the backend. 
- [ ] make it so you can view exactly where the information was pulled? Kind of like notebook LM. So it would highlight specific lines where the data comes from
