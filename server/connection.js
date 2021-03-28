import mongoose from 'mongoose'
import chalk from 'chalk'

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const connect = (DB_URI) => mongoose.connect(DB_URI, (err) => {
    if (err) {
        console.log(
            `${chalk.redBright(
                'Unable to connect, please check connection url.'
            )} ${err}`
        );
    } else {
        console.log(chalk.green('✓ Connected to database.'));
    }
});

export default connect