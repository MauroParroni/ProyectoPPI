<?php
    $conect = mysqli_connect('localhost', 'root', '', 'register') or die ('Error de conexion');
    $sql = "SELECT * FROM datos"; // Por ejemplo, aquí seleccionamos todos los registros de la tabla "register".
    $res = mysqli_query($conect, $sql);

    // Verificar si la consulta se realizó correctamente
    if ($res) {
        // Obtener los resultados de la consulta en un array asociativo
        $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

        // Devolver los datos como JSON al cliente
        echo json_encode($data);
    } else {
        // Si hubo un error en la consulta, devolver un mensaje de error
        echo json_encode(array('error' => 'Error al obtener los datos de la base de datos.'));
    }

    // Cerrar la conexión a la base de datos
    mysqli_close($conect);
?>

