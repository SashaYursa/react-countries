import { useCountries } from './hooks/useCountries'
import './App.css'
import { useEffect, useState } from 'react'
import { History } from './components/history'

export const App = () => {
  const countries = useCountries()

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [guessedCountries, setGuessedCountries] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    setupCountries()
  }, [countries])

  const setupCountries = () => {
    const selectedCountry = getRandomCountry([guessedCountries])

    const options = []

    Array.from({ length: 2 }).forEach(() => {
      options.push(
        getRandomCountry([selectedCountry, ...guessedCountries, ...options])
      )
    })

    setSelectedCountry(selectedCountry)

    const shuffledOptions = shuffleArray([selectedCountry, ...options])
    setOptions(shuffledOptions)
  }

  const getRandomCountry = (exceptedCountries) => {
    if (!countries?.length) return

    let country = findCountry()

    while (exceptedCountries.some((c) => c?.name === country?.name)) {
      country = findCountry()
    }

    return country
  }

  const findCountry = () => {
    return countries[Math.floor(Math.random() * countries.length)]
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const onSelectCountry = (country) => () => {
    if (country?.name === selectedCountry?.name) {
      setGuessedCountries((prev) => [...prev, selectedCountry])
      setupCountries()
      return
    }

    setOptions((options) =>
      options.map((prev) => {
        if (prev.name === country.name) {
          return {
            ...prev,
            isDisabled: true,
          }
        }

        return prev
      })
    )
  }

  return (
    <div className='outerContainer'>
      <History items={guessedCountries} />
      <h1>Вгадай країну за прапором</h1>
      <button className='refresh' onClick={setupCountries}>
        🔄
      </button>
      <img src={selectedCountry?.flag} alt='Прапор' className='flag' />
      <div className='answerButtons'>
        {options.map((country) => (
          <button
            disabled={country?.isDisabled}
            key={country?.name}
            className={`custom-btn ${country?.isDisabled ? 'disabled' : ''}`}
            onClick={onSelectCountry(country)}
          >
            {country?.name}
          </button>
        ))}
      </div>
    </div>
  )
}
