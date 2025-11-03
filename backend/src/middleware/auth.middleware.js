

export const authenticate = (req, res, next) => {
    try {
        // 🔒 Add your authentication logic here
        // const token = req.headers.authorization?.split(' ')[1];
        // Verify token logic...

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        // 🔐 Add authorization logic here
        next();
    };
};
