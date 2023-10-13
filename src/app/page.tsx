"use client"

import styles from './page.module.scss'
import FinancialCards from '../components/Cards'
import FinancialList from '../components/FinancialList'
import ModalCreateTransation from '../components/ModalCreateTransation'
import { useState } from 'react';

export default function Home() {
  const [ finances, setFinances ] = useState<any>([]);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    var date = new Date();
    var actualDate = date.toLocaleString('pt-BR');

    // Ok isso é ridiculo
    actualDate = actualDate.substring(0, actualDate.length-3);
    actualDate = actualDate.replace(':', 'h');
    actualDate = actualDate.replace(', ', ' às ');

    const isEmpty = Object.values(finances).every(x => x === null || x === '');
    
    let lastFinanceId = 1;

    if(!isEmpty) {
      const lastFinance = finances[finances.length - 1];
      lastFinanceId = lastFinance.id + 1;
    }

    // Clear currency format
    var regex = /[\R$.,\s]/g;
    var financeValue = formJson.value.toString();
    financeValue = financeValue.replace(regex, '');

    const newFinances = [
      ...finances, {
        id: lastFinanceId,
        description: formJson.description,
        value: financeValue,
        category: formJson.category,
        type: formJson.type,
        dateTime: actualDate,
      }
    ]

    setFinances(newFinances);

    form.reset();
  }

  const removeFinance = (id:number) => {
    const newFinances = [...finances];
    const filteredFinances = newFinances.filter((finance) => 
      finance.id !== id ? finance : null
    );
    setFinances(filteredFinances);
  }
  
  return (
    <main className={styles.main}>
        <div className="container">
          <div className={styles.financial_cards}>
            <FinancialCards 
              finances={finances}
            />
          </div>

          <ModalCreateTransation 
            handleSubmit={handleSubmit}
          />

          <FinancialList 
            finances={finances}
            removeFinance={removeFinance}
          />
        </div>
    </main>
  )
}
