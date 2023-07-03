import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
    }) => {

    const[porcentaje, setPorcentaje] = useState(70)
    const[disponible, setDisponible] = useState(0);
    const[gastado, setGastado] = useState(0)

    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad 
        + total, 0)

        const totalDisponible = presupuesto - totalGastado

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = ((presupuesto-totalGastado)/presupuesto*100).toFixed(2)


        setPorcentaje(nuevoPorcentaje)
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje)
        },1000)
    }, [gastos])


    const formatearCantidad = (cantidad)=>{
        return cantidad.toLocaleString("en-US",{
            style: "currency",
            currency: "USD"
        })
    }

    const handleResetApp = ()=>{
        const resultado = confirm("¿Deseas reiniciar presupuesto y gastos")
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }else{
            console.log("no")
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            
            <div>
                <CircularProgressbar
                value={porcentaje >0 ? porcentaje : porcentaje*(-1)}
                styles={buildStyles({
                    pathColor: porcentaje>0 ? "#3B82F6" : "#DC2626",
                    trailColor: "#F5F5F5",
                    textColor: "#3B86F6",
                })}
                text={`${porcentaje}% ${porcentaje>0? "restante" : "deuda"}`}
                />
            </div>

            <div className='contenido-presupuesto'>

                <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}
                >
                    Resetear App
                </button>

                <p><span>Presupuesto: </span> {formatearCantidad(presupuesto)}</p>

                <p 
                className={`${disponible < 0 ? "negativo" : ""}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}</p>

                <p><span>Gastado: </span> {formatearCantidad(gastado)}</p>

            </div>

        </div>
    )
}

export default ControlPresupuesto
