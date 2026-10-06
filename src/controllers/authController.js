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


    // Configurar cookie HttpOnly
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    };

    res.cookie('token', data.token, cookieOptions);

    // Retornar usuario y token (para permitir fallback si el navegador restringe cookies de terceros)
    return res.json({ usuario: data.usuario, token: data.token });

  } catch (error) {
    console.error('Error en authController.login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}


function me(req, res) {
  res.json({ user: req.user });
}

function logout(req, res) {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  });
  res.json({ message: 'Sesión cerrada exitosamente' });
}

module.exports = { login, me, logout };