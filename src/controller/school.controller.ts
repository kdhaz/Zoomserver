import express, { json } from 'express';
import { School } from '../types/school';

const router = express.Router();

const data: School[] = [
  {
    id: 1,
    name: '둔촌고',
  },
];

router.get('/', (req, res) => {
  const { name } = req.query;
  const result = [];
  if (name) {
    const filtered = data.filter((school: School) => school.name === name);
    result.push(...filtered);
  } else {
    result.push(...data);
  }
  return res.status(200).json(result);
});

router.get('/:schoolId', (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }

  const schoolIdNumber: number = parseInt(schoolId, 10);
  if (!data.some(({ id }) => id === schoolIdNumber)) {
    return res.status(404).json();
  }

  const filtered = data.filter((item: School) => item.id === schoolIdNumber);
  return res.status(200).json(filtered[0]);
});

router.post('/', (req, res) => {
  const school: School = req.body as School;
  let maxidnumber = 0;
  for (let i = 0; i < data.length; i++) {
    if (maxidnumber < data[i].id) {
      maxidnumber = data[i].id;
    }
  }
  school.id = maxidnumber + 1;
  if (!school) {
    return res.status(400).json();
  }
  data.push(school);
  return res.status(201).json();
});

router.put('/:schoolId', (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }

  const schoolIdNumber: number = parseInt(schoolId, 10);
  if (!data.some(({ id }) => id === schoolIdNumber)) {
    return res.status(404).json();
  }

  const school: School = req.body as School;
  if (school.id !== schoolIdNumber) {
    return res.status(400).json();
  }

  const index: number = data.findIndex((existSchool: School) => existSchool.id === schoolIdNumber);
  data[index] = school;
  return res.status(200).json();
});

router.delete('/:schoolId', (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }

  const schoolIdNumber: number = parseInt(schoolId, 10);
  if (!data.some(({ id }) => id === schoolIdNumber)) {
    return res.status(404).json();
  }

  const index: number = data.findIndex((existSchool: School) => existSchool.id === schoolIdNumber);
  data.splice(index, 1);

  return res.status(200).json();
});

export default router;
