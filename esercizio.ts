export interface Account {
    id: string,
    name: string,
    type: 'PRIVATE' | 'BUSINESS',
    balance: number,
    iban: string,
    lastUpate: Date,
    openingDate?: Date,
}

export interface Movement {
    id: string,
    accountId: Account,
    date: Date,
    description: string,
    amount: number,
    type: 'CREDIT' | 'DEBIT',
    category: 'Casa' | 'Lavoro' | 'Spese' | 'Stipendio' | 'Altro'
}

const conto1: Account = {
    id: 'ACC-001',
    name: 'Conto 1',
    type: 'BUSINESS',
    balance: 1234,
    iban: 'IT68D0300203280000400162854',
    lastUpate: new Date('2026-10-19'),
    openingDate: new Date('2026-10-19'),
};
const mov1: Movement = {
    id: 'MV-001',
    accountId: conto1,
    date: new Date('2026-10-19'),
    description: "Stipendio Magico",
    amount: 2500,
    type: 'CREDIT',
    category: 'Altro'
}

function checkAccType(m: Movement): void {
    switch (m.accountId.type) {
        case 'BUSINESS':
            break;
        case 'PRIVATE':
            break;
        default:
            console.log(`il tipo di account richiesto '${m.accountId.type}' non è disponibile!`);
    }
}
function checkMovType(m: Movement): void {
    switch (m.type) {
        case 'CREDIT':
            break;
        case 'DEBIT':
            break;
        default:
            console.log(`il tipo di movimento richiesto '${m.accountId.type}' non è disponibile!`);
    }
}
//checkAccType(mov1);
//checkMovType(mov1);
let accounts: Account[] = [
    {
        id: 'ACC-001',
        name: 'Conto 1',
        type: 'BUSINESS',
        balance: 1234,
        iban: 'IT68D0300203280000400162854',
        lastUpate: new Date('2026-10-19'),
        openingDate: new Date('2026-10-19'),
    },
    {
        id: 'ACC-002',
        name: 'Conto 2',
        type: 'BUSINESS',
        balance: 1234,
        iban: 'IT68D0300203280000400162854',
        lastUpate: new Date('2026-10-19'),
        openingDate: new Date('2026-10-19'),
    },
    {
        id: 'ACC-003',
        name: 'Conto 3',
        type: 'BUSINESS',
        balance: 1234,
        iban: 'IT68D0300203280000400162854',
        lastUpate: new Date('2026-10-19'),
        openingDate: new Date('2026-10-19'),
    }
];

let movements: Movement[] = [
    {
        id: 'MV-001',
        accountId: conto1,
        date: new Date('2026-10-19'),
        description: "Stipendio Magico",
        amount: 2500,
        type: 'CREDIT',
        category: 'Altro'
    },
    {
        id: 'MV-002',
        accountId: conto1,
        date: new Date('2026-10-19'),
        description: "Stipendio Magico",
        amount: 2500,
        type: 'CREDIT',
        category: 'Altro'
    },
    {
        id: 'MV-003',
        accountId: conto1,
        date: new Date('2026-10-19'),
        description: "Stipendio Magico",
        amount: 2500,
        type: 'CREDIT',
        category: 'Altro'
    }
];

function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
    return items.find(item => item.id === id);
}

//console.log(findById(accounts,'ACC-003'));
//console.log(findById(movements,'MV-003'));

async function  getAccountBalance(id: string): Promise<number>{
    const response = await fetch(`http://localhost:3000/Account/${id}`);
    if(!response.ok){
        throw new Error(`HTTP ${response.status}`);
    }
    const account: Account = await response.json();
    console.log(account);
    return account.balance;
}

async function showBalance(id:string ): Promise <void>{
    try{
        const balance = await getAccountBalance(id);
        console.log(`Saldo: €${balance}`);
    }catch(err){
        console.error('Error caricamento saldo',err);
    }
}

//showBalance('ACC-001');
//showBalance('ACC-002');

interface User {
  id: string;
  firstName: string;
  lastName: string;
  account?: Account;
}
//L'errore che è stato visualizzato indicava che non era eseguibile, perché l'account dell'user potrebbe essere null
function describeUser(user: User): string {
  return user.account ? `${user.firstName} ${user.lastName} ha il conto "${user.account?.name}" con saldo €${user.account?.balance}`: `${user.firstName} ${user.lastName} non ha un account assocciato`;
}

const userSenzaAccount: User = {
  id: 'USR-001',
  firstName: 'Mario',
  lastName: 'Rossi'
};

console.log(describeUser(userSenzaAccount));