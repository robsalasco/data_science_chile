import { csv } from 'd3-fetch';
import type { Course } from './types';

export const getData = async (): Promise<Course[]> => {
	try {
		return await csv<Course>('/data/datall.csv');
	} catch (error) {
		console.error('Error loading CSV:', error);
		return [];
	}
};
