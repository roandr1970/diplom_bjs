class Profile {
    constructor(username,firstName,lastName,password){
        this.username = username,
        this.firstName = firstName, 
        this.lastName = lastName ,
        this.password = password
    };

    addUser(users) {
        let userNew = users.find(user => user.username === this.username);
        if (userNew != undefined) {
          console.log ('Такой пользователь уже существует');
        } else {
          users.push({username: this.username, firstName: this.firstName, lastName: this.lastName, password: this.password});
          console.log(`Пользователь ${this.username} успешно добавлен`);
          console.log (users);
        }
    }

    authorization(name,pass) {
        (this.username == name && this.password == pass) ? console.log(`${this.firstName}, Вы успешно авторизованы` ) : console.log(`Неверные логин или пароль`);
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Сумма ${amount} в валюте ${currency} добавлена пользователю ${this.username}`);
            callback(err, data);
        });
    }
};

function getNewValue() {
    
    const netcoinToStandardCurrency = Math.floor(Math.random() * 10 + 1);

    return console.log({
        NETCOIN_RUB: (netcoinToStandardCurrency * 100).toFixed(3),
        NETCOIN_USD: ((netcoinToStandardCurrency * 100) / 66).toFixed(3),
        NETCOIN_EUR: ((netcoinToStandardCurrency * 100) / 72).toFixed(3),
        RUB_NETCOIN: (1 / (netcoinToStandardCurrency * 100)).toFixed(3),
        USD_NETCOIN: (1 / ((netcoinToStandardCurrency * 100) / 66)).toFixed(3),
        EUR_NETCOIN: (1 / ((netcoinToStandardCurrency * 100) / 72)).toFixed(3),
        
    });
};

let usersList = [];

const Ivan = new Profile ('ivan','Ivan','Chernyshev','ivanspass');
Ivan.addUser(usersList);

Ivan.authorization('ivan','ivanspass');

Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
        } 
});


setInterval (getNewValue,1000);

/*
function main() {
    const Ivan = new Profile({
        username :'ivan',
        name : { firstName : 'Ivan', lastName : 'Chernyshev' },
        password : 'ivanspass',
    });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
            console.error('Error during adding money to Ivan');
        } 
    });
}

main();
*/
