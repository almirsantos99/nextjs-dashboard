import styles from "./modal_create_transaction.module.scss"
import Image from 'next/image'
import { Roboto } from 'next/font/google'
import { OpenCloseModal } from "@/utils/modal"

const roboto = Roboto({ 
  weight: ['300', '400', '500'],
  subsets: ['latin']
})

interface ModalCreateTransactionProps {
    handleSubmit: Function,
}

function ApplyMask(event:any) {
    const onlyDigits = event.target.value
      .split("")
      .filter((s: string) => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(+digitsFloat)
}

function maskCurrency(valor:number, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
}

export default function ModalCreateTransaction(props : ModalCreateTransactionProps) {

    return (
        <div className={styles.modal_create_transaction} id="modalCreateTransaction">
            <div className={styles.modal_wrapper}>
                <button className={styles.close} onClick={OpenCloseModal}></button>
                <p className={styles.title}>Cadastrar Transação</p>

                <form onSubmit={(e) => props.handleSubmit(e)}>
                    {/* 19/06 5:24 Ficou pendente a validação dos campos */}
                    <input className={roboto.className} type="text" name="description" placeholder="Nome" maxLength={50}/>

                    <input className={roboto.className} type="text" name="value" placeholder="Preço" maxLength={17} onInput={(e) => ApplyMask(e)}/>

                    <div className={styles.radio_wrapper}>
                        <div className={styles.input_radio}>
                            <input className={roboto.className} type="radio" name="type" value="inflow" id="inflow_radio" />
                            <label htmlFor="inflow_radio">
                                <Image
                                    src='/icon-arrow-up-circle.svg'
                                    alt="Logo"
                                    width={22}
                                    height={22}
                                    priority
                                />
                                Entrada
                            </label>
                        </div>

                        <div className={styles.input_radio}>
                            <input className={roboto.className} type="radio" name="type" value="outflow" id="outflow_radio" />
                            <label htmlFor="outflow_radio">
                                <Image
                                    src='/icon-arrow-bottom-circle.svg'
                                    alt="Logo"
                                    width={22}
                                    height={22}
                                    priority
                                />
                                Saída
                            </label>
                        </div>
                    </div>
                    
                    <input className={roboto.className} type="text" name="category" placeholder="Categoria" maxLength={50}/>

                    <input className={roboto.className} type="submit" value="Cadastrar" onClick={OpenCloseModal} />
                </form>
            </div>
        </div>
    )
}
