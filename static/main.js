class Profile {
    constructor( {username, name:{firstName, lastName},password}){
        this.username = username,
        this.name = {firstName, lastName},
        this.password = password
    };


    createUser(callback) {
        return ApiConnector.createUser(
                {
                username: this.username,
                name: this.name,
                password: this.password
                },
                (err, data) => {
                        console.log(`Creating user ${this.username}`);
                        callback(err, data);
                        }
                );
    }            

    performLogin(callback) {
        return ApiConnector.performLogin(
            {
                username: this.username,
                password: this.password
            },
            (err, data) => {
                console.log(`Autorizing user ${this.username}`);
                callback(err, data);
                }
        );
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.transferMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency} `);
            callback(err, data);
        });
    }

};

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data[0]);
    });
}

let stocksInfo;

getStocks((err, data) => {
    if (err) {
        console.error('Error during getting stocks info');
    } else {
        stocksInfo = data;
       // console.log(stocksInfo);
      //  console.log(`Loading actual stocks info...\n${stocksInfo}`);
    }
});

function main() {

    const Ivan = new Profile({
                    username: 'ivan',
                    name: {firstName: 'Ivan', lastName: 'Chernyshev'},
                    password: 'ivanspass',
                });

    const Petr = new Profile({
                    username: 'petr',
                    name: {firstName: 'Petr', lastName: 'Voronin'},
                    password: 'petrspass',
                });

    Ivan.createUser((err,data) => {
        if (err) {
            console.error('Error creating user ivan');
        } else {
                console.log(`ivan is created`);
                Ivan.performLogin((err,data) => {
                    if (err) {
                        console.error('User authorization failed ivan');
                        } else {
                            console.log(`ivan is authorizing`);
                            Ivan.addMoney({ currency: 'RUB', amount: 500000 }, (err, data) => {
                                if (err) {
                                    console.error('Error during adding money to ivan');
                                    } else {
                                        console.log(`Added 500000 RUB to ivan`);
                                        Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN' , targetAmount: 500000 * Number(stocksInfo.RUB_NETCOIN) }, (err,data) => {
                                            if (err) {
                                                console.error('Сonversion error');
                                                console.log(err);
                                            } else {
                                                console.log(`Converted to coins ${Ivan}`);
                                                Petr.createUser((err,data) => {
                                                    if (err) {
                                                        console.error('Error creating user petr');
                                                    } else {
                                                        console.log(`petr is created`);
                                                        Ivan.transferMoney({ to: 'petr', amount: targetAmount }, (err,data) => {
                                                            if (err) {
                                                                console.error('Мoney transfer error');
                                                            } else {
                                                                console.log(`Petr has got ${amount} NETCOINS`);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                            });
                        }
                });
        }
    }) ;

}

main();
