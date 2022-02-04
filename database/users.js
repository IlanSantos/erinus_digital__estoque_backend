const { CreateJwt } = require("../tools/token")
const db = require("./index")


const CreateUser = async user => {
    const client = await db.connect()
    try{
        const txt_create_user = "INSERT INTO ERINUS_ADMINISTRATION_MOD.USERS(name, username, password) VALUES ($1, $2, $3);"
        const values_create_user = [user.name, user.username, user.password]
        await client.query(txt_create_user, values_create_user)
        return true
    }catch(error){
        throw error
    }finally{ 
        client.release()
    }
}

const SearchUserByUsername = async username => {
    const client = await db.connect()
    try{
        const txt_search_user = "SELECT * FROM ERINUS_ADMINISTRATION_MOD.USERS WHERE username = $1;"
        const values_search_user = [username]
        const user = await client.query(txt_search_user, values_search_user)
        if(user.rowCount === 0) return false
        else return user.rows[0]
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}

const CreateSession = async (user) => {
    const client = await db.connect()
    try{
        const token = CreateJwt({id: user.id, name: user.name, username: user.username})
        const txt_create_session = "INSERT INTO ERINUS_ADMINISTRATION_MOD.SESSIONS(USER_ID, TOKEN) VALUES($1, $2) RETURNING *;"
        const values_create_session = [user.id, token]
        const query_create_session = await client.query(txt_create_session, values_create_session)
        return query_create_session.rows[0]
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}

const SearchSession = async (sid) => {
    const client = await db.connect()
    try{
        console.log('chegou aqui')
        const txt_search_session = "SELECT s.id, s.token , u.ID AS USER_ID, u.name AS USER_NAME, u.is_adm AS IS_ADM, u.registered_at AS USER_RG_AT"
        +" FROM ERINUS_ADMINISTRATION_MOD.SESSIONS s INNER JOIN ERINUS_ADMINISTRATION_MOD.USERS u "
        +"ON s.user_id = u.id WHERE s.id = $1;"
        const query_search_session = await client.query(txt_search_session, [sid])
        if (query_search_session.rowCount === 0) throw "Sessão não localizada."
        else return query_search_session.rows[0]
    }catch(error){
        throw error
    }finally{
        client.release()
    }
}
module.exports = {
    CreateUser,
    SearchUserByUsername,
    CreateSession,
    SearchSession
}
