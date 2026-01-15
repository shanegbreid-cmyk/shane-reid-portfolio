<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '&QGWJHf_G>RnN(TJbb#Ix#x^ouBRd3#7!u2[71QrORrddCi:XWMi!6^fc1cOE&|E' );
define( 'SECURE_AUTH_KEY',   'H}2T,k>Jqyz0-_N^=Oc7Jp,*hOCLOkUtB&]P8WcfIWM),/OhJ-RW686U(npp(O5@' );
define( 'LOGGED_IN_KEY',     'G>b%s*C@6CEhN31<]}bGgs-Z{dO)5swqlD(5u85Rro:DHXL[Xx5E9Wnz3/t~34^T' );
define( 'NONCE_KEY',         '{W~_^Z%l#~#YNy5xH@*9nfa4!>6jS]y&?FuZ}dh(~C~ U[{Wa_bJYHGe4?e.BTuF' );
define( 'AUTH_SALT',         '6`[gy7v`bbEWbvS8ckp:ttPVh#Tizt=z]u*f3e65rVZq;(IZQH=yfOvID!0OJ{NM' );
define( 'SECURE_AUTH_SALT',  '^$7jttQ:m7u2z1lFcmN~+:1tsb)UZWtYE+q+PA^G_.3C%f}.Neh@Yvl+=_,U!l~F' );
define( 'LOGGED_IN_SALT',    'c12Q+k9n-f{`*E,H!kHYP{voi76n]FX&FCfMxchd jwGK!}dc_&4TgtiLZW$FR%r' );
define( 'NONCE_SALT',        'nX7mByO|r4dNB&&5j)u}o;wx}=^h=o#57:)}To}$EwJA:Xf]@xdA8UC31$yii7le' );
define( 'WP_CACHE_KEY_SALT', 'J4C/Jv7>=I>P,y()kT#xnM!-jmX+f>Z{.)i%6M?5mmnEc(D>*[;-pC`R-E37&9yt' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
