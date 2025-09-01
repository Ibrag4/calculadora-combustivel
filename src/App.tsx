import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import logoImage from './assets/icon_pjt.png'

interface InfoProps {
  title: string;
  gasolina: string;
  alcool: string;
}

function App() {
  const [gasolinaInput, setGasolinaInput] = useState<string>("")
  const [alcoolInput, setAlcoolInput] = useState<string>("")
  const [info, setInfo] = useState<InfoProps>()

  function formatarMoedaInput(valor: string): string {
    const apenasNumeros = valor.replace(/\D/g, "")
    const numero = parseFloat(apenasNumeros) / 100
    if (isNaN(numero)) return ""
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }

  function handleGasolinaChange(e: React.ChangeEvent<HTMLInputElement>) {
    setGasolinaInput(formatarMoedaInput(e.target.value))
  }

  function handleAlcoolChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAlcoolInput(formatarMoedaInput(e.target.value))
  }

  function calcular(event: FormEvent) {
    event.preventDefault()

    const valorAlcool = Number(alcoolInput.replace(/\D/g, "")) / 100
    const valorGasolina = Number(gasolinaInput.replace(/\D/g, "")) / 100

    if (!valorAlcool || !valorGasolina) {
      alert("Preencha os dois campos corretamente.")
      return
    }

    const calculo = valorAlcool / valorGasolina

    const resultado: InfoProps = {
      title: calculo <= 0.7 ? "Compensa usar álcool" : "Compensa usar gasolina",
      gasolina: valorGasolina.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      alcool: valorAlcool.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    setInfo(resultado)
  }

  function limparCampos() {
    setGasolinaInput("")
    setAlcoolInput("")
    setInfo(undefined)
  }

  return (
    <div>
      <main className='container'>
        <img className='logo' src={logoImage} alt='logo calculadora de combustíveis' />
        <h1 className='title'>Qual melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className='input'
            type='text'
            placeholder='ex: R$ 4,90'
            required
            value={alcoolInput}
            onChange={handleAlcoolChange}
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className='input'
            type='text'
            placeholder='ex: R$ 5,90'
            required
            value={gasolinaInput}
            onChange={handleGasolinaChange}
          />

          <input className='button' type='submit' value="Calcular" />

          <button type="button" className='button-limpar' onClick={limparCampos}>
            Limpar
          </button>
        </form>

        {info && (
          <section className='result'>
            <h2 className='result-title'>{info.title}</h2>
            <span>Álcool: {info.alcool}</span>
            <span>Gasolina: {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
