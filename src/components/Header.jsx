import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


const Header = ({
  setGastos,
  gastos,
  presupuesto, 
  setPresupuesto, 
  isValidPresupuesto, 
  setIsValidPresupuesto
}) => {


  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidPresupuesto ? (
        <ControlPresupuesto
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        presupuesto={presupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (<NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />)}
      
    </header>
  )
}

export default Header
