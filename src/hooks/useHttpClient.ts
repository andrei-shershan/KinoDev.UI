import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../services/httpClient';

export const useHttpClient = () => {
  const navigate = useNavigate();

  useEffect(() => {
    httpClient.setNavigateCallback((path) => navigate(path));
    return () => httpClient.setNavigateCallback(() => {});
  }, [navigate]);

  return httpClient;
};
