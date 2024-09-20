function PositionInput({suffix, min, max, onChange, dimensions}) {
    const numDims = dimensions ?? 3

    return (
        <>
            <b>(X: </b>
            <input type="number" name={`x${suffix || ""}`} min={min} max={max} onChange={onChange} />
            <b>, Y: </b>
            <input type="number" name={`y${suffix || ""}`} min={min} max={max} onChange={onChange} />
            { 
                numDims === 3 &&
                <>
                    <b>, Z: </b>
                    <input type="number" name={`z${suffix || ""}`} min={min} max={max} onChange={onChange} />
                </>
            }
            <b>)</b>
        </>
    )
}

export default PositionInput