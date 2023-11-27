import { Model, DataTypes } from 'sequelize';
import sequelize from './Connection';

class User extends Model {
    public id! : number ;
    public userName!: string ;
    public password! : string ; 

}

User.init({
    id :{
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    userName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    sequelize,
    modelName : 'user'
});


export default User ;