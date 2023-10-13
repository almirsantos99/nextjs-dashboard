import styles from "./financial_list.module.scss"
import Image from 'next/image'
import { formatPrice } from "@/utils/format-price"

interface FinancialListProps {
  finances: Array<string>,
  removeFinance: Function,
}

interface FinanceProps {
  id: number,
  type: string,
  description: string,
  value: number,
  category: string,
  date: string,
  removeFinance: Function,
}

function Finance(props : FinanceProps) {
  const value = formatPrice(props.value);

  return (
    <tr key={props.id}>
        <td>{props.description}</td>
        <td data-type={props.type}>{value}</td>
        <td>{props.category}</td>
        <td>{props.date}</td>
        <td>
            <button className={styles.action_remove} onClick={() => props.removeFinance(props.id)}>
                <Image
                    className={styles.card_icon}
                    src="/icon-trash.svg"
                    alt="Trash icon"
                    width={14}
                    height={14}
                    priority
                />
            </button>
        </td>
    </tr>
                
  )
}

export default function FinancialList(props : FinancialListProps) {
  const finances = props.finances;

  const isEmpty = Object.values(finances).every(x => x === null || x === '');

  if(isEmpty) {
    return (
      <div className={styles.financial_wrapper}>
        <div className={styles.financial_empty}>Sem resultados.</div>
      </div>
    )
  }

  return (
    <div className={styles.financial_wrapper}>
        <table className={styles.financial_list}>
            <thead className={styles.list_header}>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className={styles.list_content}>
                {finances?.map((finance:any) => 
                    <Finance 
                        key={finance.id}
                        id={finance.id} 
                        value={finance.value}
                        description={finance.description}
                        type={finance.type}
                        category={finance.category}
                        date={finance.dateTime} 
                        removeFinance={props.removeFinance}
                    />
                )}
            </tbody>
        </table>
    </div>
  )
}
