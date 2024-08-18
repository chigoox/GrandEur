import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";

export const AutoCompleteInput = ({ valueX, setter, isDisabled, className, }) => {

    const [inputValue, setInputValue] = useState('')
    const [updatedInput, setUpdatedInput] = useState(false)

    useEffect(() => {
        if (updatedInput) setter({ target: { name: 'address', value: inputValue } })
        setUpdatedInput(false)
        setInputValue(valueX)
    }, [inputValue, valueX])


    const { ref } = usePlacesWidget({
        apiKey: 'AIzaSyDu0t5ZAFoF8oKGdoretlTZfmZ0XQXmgok',
        onPlaceSelected: (place) => {
            setUpdatedInput(true)
            setInputValue(place?.formatted_address);
        },
        options: {
            types: ["geocode", "establishment"],
            componentRestrictions: { country: "us" },

        },
    });

    return <Input autocomplete="off" isDisabled={isDisabled} name="address" className={className} value={inputValue} onChange={setter} onValueChange={v => setInputValue(v)} ref={ref} variant="flat" label={'Address'} labelPlacement="inside" placeholder="123 Main st, City, NJ 07001, USA" />;
};