 <?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    include 'DbConnect.php';

    $objDb = new DbConnect;
    $conn = $objDb->connect();

    $method = $_SERVER['REQUEST_METHOD'];
    $response = ['status' => 0, 'message' => 'err'];

    if ($method === 'POST') {
        $path = $_SERVER['PATH_INFO'] ?? '/';

        switch ($path) {
            case '/get/products':
                $stmt = $conn->prepare('SELECT * FROM products');
                $stmt->execute();
                $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($products) {
                    $response['status'] = 1;
                    $response['message'] = 'Products retrieved successfully';
                    $response['products'] = $products;
                } else {
                    $response['message'] = 'No products found';
                }
                break;

            case '/create/product':
                $formData = $_POST;

                // Validating required fields
                if (!isset($formData['name']) || !isset($formData['description']) || !isset($formData['price']) || !isset($formData['type'])) {
                    $response['message'] = 'Please provide all required fields';
                } else {
                    // Sanitizing input
                    $name = filter_var($formData['name'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $description = filter_var($formData['description'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $price = str_replace(',', '.', $formData['price']);
                    $price = filter_var($price, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
                    $type = filter_var($formData['type'], FILTER_SANITIZE_SPECIAL_CHARS,);
                    //echo json_encode($price);
                    // Handling image upload
                    if (isset($_FILES['image'])) {
                        $targetDir = '../productImages/';
                        $fileName = basename($_FILES['image']['name']);
                        $targetFilePath = $targetDir . $fileName;
                        $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

                        // Creating folder if it doesn't exist
                        if (!file_exists($targetDir)) {
                            mkdir($targetDir, 0777, true);
                        }

                        // Validating file type
                        $allowTypes = array('jpg', 'jpeg', 'png', 'gif');
                        if (in_array($fileType, $allowTypes)) {
                            // Uploading file to server
                            if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
                                $imgUrl = $targetFilePath;

                                // Inserting data into database
                                $stmt = $conn->prepare('INSERT INTO products (name, description, price, type, imgUrl) VALUES (?, ?, ?, ?, ?)');
                                if ($stmt->execute([$name, $description, $price, $type, $imgUrl])) {
                                    $response['status'] = 1;
                                    $response['message'] = 'Product created successfully';
                                } else {
                                    $response['message'] = 'Error creating product';
                                }
                            } else {
                                $response['message'] = 'Error uploading image';
                            }
                        } else {
                            $response['message'] = 'Invalid image file type';
                        }
                    } else {
                        $response['message'] = 'Please provide an image file';
                    }
                }
                break;

            case '/get/types':
                $stmt = $conn->prepare('SELECT * FROM product_type');
                $stmt->execute();
                $types = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($types) {
                    $response['status'] = 1;
                    $response['message'] = 'Products retrieved successfully';
                    $response['types'] = $types;
                } else {
                    $response['status'] = 0;
                    $response['message'] = 'No products found';
                }
                break;

            case '/create/type':
                $formData = $_POST;

                // Validating required fields
                if (!isset($formData['typeName'])) {
                    $response['message'] = 'Please provide a name for the product type';
                } else {
                    // Sanitizing input
                    $name = filter_var($formData['typeName'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $taxes = filter_var($formData['typeTaxes'], FILTER_SANITIZE_SPECIAL_CHARS);

                    // Inserting data into database
                    $stmt = $conn->prepare('INSERT INTO product_type (name, percent_taxes) VALUES (?,?)');
                    if ($stmt->execute([$name, $taxes])) {
                        $response['status'] = 1;
                        $response['message'] = 'Product type created successfully';
                    } else {
                        $response['message'] = 'Error creating product type';
                    }
                }
                break;

            case '/get/purchases':
                $stmt = $conn->prepare('SELECT * FROM sales');
                $stmt->execute();
                $purchases = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if ($purchases) {
                    $response['status'] = 1;
                    $response['message'] = 'Sales retrieved successfully';
                    $response['purchases'] = $purchases;
                } else {
                    $response['status'] = 0;
                    $response['message'] = 'No products found';
                }
                break;

            case '/purchase':
                $formData = $_POST;

                // Validating required fields
                if (!isset($formData['product_id']) || !isset($formData['name']) || !isset($formData['email']) || !isset($formData['phone']) || !isset($formData['quantity']) || !isset($formData['total_price']) || !isset($formData['total_tax_price']) || !isset($formData['item_price']) || !isset($formData['item_tax_percentage']) || !isset($formData['item_total_price'])) {
                    $response['message'] = 'Please provide all required data';
                } else {
                    // Sanitizing input
                    $product_id = filter_var($formData['product_id'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $name = filter_var($formData['name'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $email = filter_var($formData['email'], FILTER_SANITIZE_EMAIL);
                    $phone = filter_var($formData['phone'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $quantity = filter_var($formData['quantity'], FILTER_SANITIZE_NUMBER_INT);
                    $total_price = filter_var($formData['total_price'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $total_tax_price = filter_var($formData['total_tax_price'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $item_price = filter_var($formData['item_price'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $item_tax_percentage = filter_var($formData['item_tax_percentage'], FILTER_SANITIZE_SPECIAL_CHARS);
                    $item_total_price = filter_var($formData['item_total_price'], FILTER_SANITIZE_SPECIAL_CHARS);

                    // Inserting data into database
                    $stmt = $conn->prepare('INSERT INTO sales (product_id, name, email, phone, quantity, total_price, total_tax_price, item_price, item_tax_percentage, item_total_price) VALUES (?,?,?,?,?,?,?,?,?,?)');
                    if ($stmt->execute([$product_id, $name, $email, $phone, $quantity, $total_price, $total_tax_price, $item_price, $item_tax_percentage, $item_total_price])) {
                        $response['status'] = 1;
                        $response['message'] = 'Purchase created successfully';
                    } else {
                        $response['status'] = 0;
                        $response['message'] = 'Error creating purchase';
                    }
                }
                break;


            default:
                $response['message'] =
                    'Invalid endpoint';
        }
    } else {
        $response['message'] = 'Invalid request method';
    }

    echo json_encode($response);

    header('Content-Type: application/json');
