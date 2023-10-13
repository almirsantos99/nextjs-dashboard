import Image from 'next/image'
import { formatPrice } from "@/utils/format-price"
import styles from "./cards.module.scss"

interface FinancialCardProps {
  finances: Array<string>
}

interface CardProps {
  type: string,
  title: string,
  value: number,
}

function getCards(finances:Array<string>) {
  const cardsValues = () => {
    const newFinances = finances;
  
    // Sum the inflow registers
    let inflowSum:number = 0;
    newFinances.filter((finance:any) => 
      finance.type == "inflow" ? inflowSum += +finance.value : ''
    );
  
    // Sum the outflow registers
    let outflowSum:number = 0;
    newFinances.filter((finance:any) => 
      finance.type == "outflow" ? outflowSum += +finance.value : ''
    );
  
    // Create the balance based on inflow and outflow registers
    let financesBalance:number = 0;
    newFinances.filter((finance:any) => 
      finance.type == "inflow" ? financesBalance += +finance.value : financesBalance += - +finance.value
    );
  
    return {
      inflowSum: inflowSum, 
      outflowSum: outflowSum, 
      financesBalance: financesBalance,
    };
  
  }
  
  let cards = [
  {
    id: 1,
    type: "inflow",
    title: "Entradas",
    value: 0
  },{
    id: 2,
    type: "outflow",
    title: "Saídas",
    value: 0
  },{
    id: 3,
    type: "balance",
    title: "Saldo Total",
    value: 0
  }];
  
  const isEmpty = Object.values(finances).every(x => x === null || x === '');
  
  if(!isEmpty) {
    let financeSumValues = cardsValues();

    cards = [
    {
      id: 1,
      type: "inflow",
      title: "Entradas",
      value: financeSumValues.inflowSum
    },{
      id: 2,
      type: "outflow",
      title: "Saídas",
      value: financeSumValues.outflowSum
    },{
      id: 3,
      type: "balance",
      title: "Saldo Total",
      value: financeSumValues.financesBalance
    }];
  }

  return cards;
  
}

function CardIcon({ type }: {type: string}){
  if(type !== "balance" && type) {
    return <Image
      className={styles.card_icon}
      src={type == 'outflow' ? '/icon-arrow-up-right.svg' : '/icon-arrow-bottom-left.svg'}
      alt="Logo"
      width={18}
      height={18}
      priority
    />
  }

  return <></>;
}

function Card(props : CardProps) {
  const value = formatPrice(props.value);

  return (
      <div className={styles.card} 
          data-type={props.type}
          >
          <div className={styles.card_header}>
            <p className={styles.card_title}>{props.title}</p>
            
            <CardIcon type={props.type} />
          </div>
          <p className={styles.card_value}>{value}</p>
      </div>
  )
}

export default function FinancialCards(props : FinancialCardProps) {
  let cards = getCards(props.finances);

  return (
      <>
        {cards?.map((card) => 
          <Card 
            key={card.id}
            type={card.type}
            title={card.title}
            value={card.value}
          />
        )}
      </>
  )
}
