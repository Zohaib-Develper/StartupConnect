import { createSlice } from '@reduxjs/toolkit';

const mockInvestments = [
  {
    id: '1',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '1',
    projectTitle: 'EcoTrack',
    amount: 200000,
    date: '2025-07-10',
  },
  {
    id: '2',
    investorId: '5',
    investorName: 'Chand Ali',
    projectId: '1',
    projectTitle: 'EcoTrack',
    amount: 125000,
    date: '2025-07-25',
  },
  {
    id: '3',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '2',
    projectTitle: 'MediChain',
    amount: 450000,
    date: '2025-08-15',
  },
  {
    id: '4',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '3',
    projectTitle: 'FinLit',
    amount: 200000,
    date: '2025-05-20',
  },
  {
    id: '5',
    investorId: '5',
    investorName: 'Chand Ali',
    projectId: '3',
    projectTitle: 'FinLit',
    amount: 100000,
    date: '2025-06-01',
  },
  {
    id: '6',
    investorId: '5',
    investorName: 'Chand Ali',
    projectId: '4',
    projectTitle: 'AgriSense',
    amount: 180000,
    date: '2025-09-10',
  },
  {
    id: '7',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '6',
    projectTitle: 'SwiftDeliver',
    amount: 300000,
    date: '2025-06-15',
  },
  {
    id: '8',
    investorId: '5',
    investorName: 'Chand Ali',
    projectId: '6',
    projectTitle: 'SwiftDeliver',
    amount: 210000,
    date: '2025-06-28',
  },
  {
    id: '9',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '7',
    projectTitle: 'PetPal',
    amount: 120000,
    date: '2025-04-05',
  },
  {
    id: '10',
    investorId: '5',
    investorName: 'Chand Ali',
    projectId: '7',
    projectTitle: 'PetPal',
    amount: 80000,
    date: '2025-04-20',
  },
  {
    id: '11',
    investorId: '2',
    investorName: 'Sara Ahmed',
    projectId: '8',
    projectTitle: 'CyberShield',
    amount: 420000,
    date: '2025-10-15',
  },
];

const initialState = {
  investments: mockInvestments,
  loading: false,
  error: null,
};

const investmentSlice = createSlice({
  name: 'investments',
  initialState,
  reducers: {
    addInvestment: (state, action) => {
      const newInvestment = {
        ...action.payload,
        id: String(state.investments.length + 1),
        date: new Date().toISOString().split('T')[0],
      };
      state.investments.push(newInvestment);
    },
    getInvestmentsByProject: (state, action) => {
      return state.investments.filter(
        (inv) => inv.projectId === action.payload
      );
    },
  },
});

export const { addInvestment } = investmentSlice.actions;

export default investmentSlice.reducer;
