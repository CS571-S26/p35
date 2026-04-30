import * as ics from 'ics';

function parseTime(time) {
    if (!time || typeof time !== 'string') {
        return null;
    }

    const [hours, minutes] = time.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return null;
    }

    return { hours, minutes };
}

function getDuration(startTime, endTime) {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (!start || !end) {
        return null;
    }

    const startMinutes = (start.hours * 60) + start.minutes;
    const endMinutes = (end.hours * 60) + end.minutes;
    const durationMinutes = Math.max(0, endMinutes - startMinutes);

    return {
        hours: Math.floor(durationMinutes / 60),
        minutes: durationMinutes % 60
    };
}

export const downloadIcsFile = ({ title, date, description = '', location = '', duration, startTime, endTime, recurrenceRule }) => {
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





    if (recurrenceRule) {
        eventObj.recurrenceRule = recurrenceRule;
    }

    const parsedStartTime = parseTime(startTime);
    const calculatedDuration = duration ?? getDuration(startTime, endTime);

    // If there is not duration or start time given, default to all day
    if (parsedStartTime || calculatedDuration) {
        eventObj.start = parsedStartTime
            ? [...baseDate, parsedStartTime.hours, parsedStartTime.minutes]
            : [...baseDate, 9, 0];
        eventObj.duration = calculatedDuration ?? { hours: 1 };
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
