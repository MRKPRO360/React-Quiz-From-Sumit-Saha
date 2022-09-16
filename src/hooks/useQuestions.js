import { useEffect, useState } from "react";
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setVideos] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setLoading(true);
        setError("");
        const snapshot = await get(quizQuery);
        setLoading(false);

        if (snapshot.exists()) {
          setVideos((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    questions,
    loading,
    error,
  };
}
