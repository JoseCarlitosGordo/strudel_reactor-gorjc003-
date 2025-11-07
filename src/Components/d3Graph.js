export default function graph()
{
    function logToNum(input)
    {
        letters = {'C': 0,  'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
        if (!input) {return 0};
        var stringArray  = input.split(/(\s+)/)
        for(const item of stringArray)
        {
            if(item.startsWith('note:'))
            {
                let val = item.substring(5)
                midi_number = 12 +(12 * parseInt(val[1])) + letters[val[0].toUpperCase()] 
                return midi_number
            }
        }

    }
}