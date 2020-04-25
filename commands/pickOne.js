/**
 * Returns number for array
 * @param {number} length random total back.
 * @return {number} Random Number back
 * @constructor
 */
function GetRandomNumber(length)
{
    return Math.floor(Math.random() * length);
}

function getRandomSelection(args) {
    if(args===undefined)
        return "Nothing to pick from, you get nothing back."

    let valuesArray = args.split(',');
    if(valuesArray.length ===1 )
        return `Surprise, surprise..you got ${valuesArray[0]} ... anyone really surprised?`;
    let num = GetRandomNumber(valuesArray.length);

    return `The viewers want ${valuesArray[num]}.`
}

module.exports = {
    name: 'pick1',
    description: 'Feed this command a list of comma separated values and it will pick one randomly for you.',
    execute(args, bot) {
        let message = getRandomSelection(args[1]);
        bot.channel.send(message);
    }
}