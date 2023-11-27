import Seq from 'sequelize' ;


const connection = new Seq.Sequelize(
    'ts_user',
    'root',
    '',
    {
        host:'localhost' ,
         dialect:"mysql"
        });

export default connection ;