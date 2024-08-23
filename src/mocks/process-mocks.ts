import { Process } from '../pages/process/interfaces/process'
import { Type } from '../pages/sherpas/interfaces/user'

export const processMocks: Process[] = [
  {
    id: 1,
    name: 'Process 1',
    description: 'Description 1',
    createdBy: '218938912983sdkasda12389dasd',
    createdOn: '2022-01-01',
    creator: {
      id: '218938912983sdkasda12389dasd',
      uid: 'abc123',
      email: 'john.doe@example.com',
      name: 'John Doe',
      avatar: 'https://example.com/avatar1.png',
      type: Type.Azure,
      phoneNumber: '555-1234',
      birthDate: '1990-01-01',
      address: '123 Main St, Springfield',
      matiralStatus: 'Single',
      haveChildren: false,
      hobbies: 'Reading, Hiking',
      notes: 'Prefers remote work',
    },
  },
  {
    id: 2,
    name: 'Process 2',
    description: 'Description 2',
    createdBy: '218938912983sdkasda12389dasd',
    createdOn: '2022-01-01',
  },
]
