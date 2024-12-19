import { useState, useEffect } from 'react';
import axios from 'axios';

const usePagination = (endpoint: string, limit = 10) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(endpoint, {
          params: { page: currentPage, limit },
        });
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching paginated data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [endpoint, currentPage, limit]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return { data, currentPage, totalPages, nextPage, prevPage, loading };
};

export default usePagination;
