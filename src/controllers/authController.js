const authService = require('../services/authService');


async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username y password son requeridos' });
  }

  try {

    const data = await authService.login(username, password);

    if (!data) {
    
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }


    return res.json(data);

  } catch (error) {
    console.error('Error en authController.login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}


function me(req, res) {
  res.json({ user: req.user });
}

module.exports = { login, me };