class Profile {
    constructor( {username, name, firstName, lastName,password}){
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
            console.log(`Converting ${targetAmount} ${fromCurrency} to ${targetCurrency} `);
            callback(err, data);
        });
    }

};

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        callback(err, data);
    });
}

function main() {

    const Ivan = new Profile({
                    username: 'ivan',
                    name: {firstName: 'Ivan', 
                    lastName: 'Chernyshev'},
                    password: 'ivanspass',
                });

    const Petr = new Profile({
                    username: 'petr',
                    name: {firstName: 'Petr', 
                    lastName: 'Voronin'},
                    password: 'petrspass',
                });

    Ivan.createUser((err,data) => {
        if (err) {
            console.error('Error creating user ivan');
        } else {
                console.log(`Ivan is created`);
                Ivan.performLogin((err,data) => {
                    if (err) {
                        console.error('User authorization failed ivan');
                        } else {
                            console.log(`Ivan is authorizing`);
                        }
                });
        }
    }) ;
/*

   
    Ivan.addMoney({ currency: 'RUB', amount: 100000 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
            } else {
                console.log(`Added ${amount} ${currency} to Ivan`);
            }
    });
/*
    Petr.createUser({
        username: 'andrey',
        name: {firstName: 'Andrey', 
        lastName: 'Rodionov'},
        password: 'andreyspass',
        }, (err,data) => {
            if (err) {
                console.error('Error creating user andrey');
                } else {
                    console.log(`andrey is created`);
                }
        });

    Petr.performLogin({ username: 'andrey', password: 'andreyspass'}, (err,data) => {
            if (err) {
                console.error('User authorization failed andrey');
                } else {
                    console.log(`Andrey is authorizing`);
                }
    });

    Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: 100000 }, (err,data) => {
        if (err) {
            console.error('Conversion is not made');
            } else {
                console.log(`Converted to coins ${Ivan}`);
            }
    });
*/
}

main();
