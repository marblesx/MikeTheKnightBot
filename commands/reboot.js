const exec = require('child_process').exec;
/**
 * Runs a command that pulls changes of code from git repo.
 * */
function reboot()
{
    const child = exec("cd ~ ; cd Desktop/MikeTheKnightBot ; git pull origin master ", function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
module.exports = {
    name: 'update',
    description: 'Reboots the bot and pulls latest code.',
    execute(args, bot){
        bot.channel.send('Updating with latest code!');
        reboot();
    }
};