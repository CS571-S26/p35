import * as ics from 'ics';

export const downloadIcsFile = ({ title, date, description = '', location = '', duration }) => {
    // 1. Validate inputs
    if (!title || !date) {
        console.error('downloadIcsFile: Missing required fields (title, date).');
        return;
    }

    //  Parse the date string (YYYY-MM-DD)
    const parts = date.split('-').map(Number);
    const baseDate = [parts[0], parts[1], parts[2]]; // [YYYY, MM, DD]


    // Make a little AI disclaimer so we don't get sued or something lol
    const aiNote = "This event was extracted by the Syllabus Analyzer using AI.";
    // If a description exists, add a nice divider and the note. Otherwise, just use the note.
    const finalDescription = description
        ? `${description}\n\n---\n${aiNote}`
        : aiNote;



    // Build the core event object
    const eventObj = {
        title,
        description: finalDescription,
        location,
    };





    // If there is not duartion given, default to all day
    if (duration) {
        // TIMED EVENT: Add default hours/minutes (e.g., 9:00 AM) and append the duration
        eventObj.start = [...baseDate, 9, 0];
        eventObj.duration = duration;
    } else {
        // ALL-DAY EVENT: Use the 3-number baseDate, and set the end date to the next day
        const startDateObj = new Date(parts[0], parts[1] - 1, parts[2]);
        const endDateObj = new Date(startDateObj);
        endDateObj.setDate(startDateObj.getDate() + 1);

        eventObj.start = baseDate;
        eventObj.end = [endDateObj.getFullYear(), endDateObj.getMonth() + 1, endDateObj.getDate()];
    }

    // Generate ICS file and download it 
    ics.createEvent(eventObj, (error, value) => {
        if (error) {
            console.error('Error creating ICS file:', error);
            return;
        }

        const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // Use the safe file name fix!
        const safeTitle = title.replace(/[<>:"/\\|?*]+/g, '');
        a.download = `${safeTitle}.ics`;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
};