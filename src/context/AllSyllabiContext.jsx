import { createContext, useContext } from 'react';

const AllSyllabiContext = createContext([]);

export default AllSyllabiContext;

// Custom hook for accessing current syllabus
export function useCurrentSyllabus() {
  const { allSyllabi } = useContext(AllSyllabiContext);
  const currentIndex = Number(localStorage.getItem('currentSyllabusIndex')) || 0;
  return allSyllabi[currentIndex] || null;
}

// Custom hook for accessing all syllabus data and utilities
export function useSyllabi() {
  const { allSyllabi, setAllSyllabi, setCurrentSyllabusIndex } = useContext(AllSyllabiContext);
  const currentIndex = Number(localStorage.getItem('currentSyllabusIndex')) || 0;
  
  return {
    allSyllabi,
    setAllSyllabi,
    setCurrentSyllabusIndex,
    currentSyllabus: allSyllabi[currentIndex] || null,
    currentIndex
  };
}