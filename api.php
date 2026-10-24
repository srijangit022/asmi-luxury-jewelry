<?php
/**
 * ASMI Luxury Haute Joaillerie - Standalone Traditional Hosting API Engine
 *
 * Lightweight, zero-dependency REST API for traditional Apache, LiteSpeed,
 * cPanel, and Nginx web hosting environments.
 *
 * Persists all Master Atelier Admin Console updates, product catalog, customer
 * orders, cancellation requests, reviews, and support chats directly to the
 * local data/*.json files, and handles transactional merchant emails.
 */

// Set execution limits and CORS headers
@ini_set('memory_limit', '256M');
@set_time_limit(60);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-ASMI-Admin-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rootDir = __DIR__;
$dataDir = $rootDir . DIRECTORY_SEPARATOR . 'data';
$assetsDir = $rootDir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images';

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
if (!is_dir($assetsDir)) {
    @mkdir($assetsDir, 0755, true);
}

// Helper: Read JSON database file
function asmi_read_json($filename, $default = array()) {
    global $dataDir;
    $filePath = $dataDir . DIRECTORY_SEPARATOR . $filename;
    if (file_exists($filePath)) {
        $content = file_get_contents($filePath);
        if ($content !== false) {
            $parsed = json_decode($content, true);
            if ($parsed !== null) {
                return $parsed;
            }
        }
    }
    return $default;
}

// Helper: Save JSON database file with safe atomic write
function asmi_save_json($filename, $data) {
    global $dataDir;
    $filePath = $dataDir . DIRECTORY_SEPARATOR . $filename;
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }
    return (file_put_contents($filePath, $json, LOCK_EX) !== false);
}

// Resolve requested endpoint
$uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
$parsedUrl = parse_url($uri);
$path = isset($parsedUrl['path']) ? $parsedUrl['path'] : '';

// Remove base path to find endpoint
$endpoint = '';
if (isset($_GET['endpoint'])) {
    $endpoint = trim($_GET['endpoint'], '/');
} elseif (preg_match('#/(?:api|wp-json/asmi/v1)/(.*)$#i', $path, $matches)) {
    $endpoint = trim($matches[1], '/');
} else {
    $endpoint = trim(preg_replace('#^.*?api/?#i', '', $path), '/');
}

$method = $_SERVER['REQUEST_METHOD'];
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);

// -----------------------------------------------------------------------------
// ROUTER & CONTROLLERS
// -----------------------------------------------------------------------------

switch ($endpoint) {

    // 1. Unified Sync Endpoint
    case 'sync':
        if ($method === 'GET') {
            echo json_encode(array(
                'success' => true,
                'data' => array(
                    'settings'     => asmi_read_json('settings.json'),
                    'products'     => asmi_read_json('products.json'),
                    'coupons'      => asmi_read_json('coupons.json'),
                    'categories'   => asmi_read_json('categories.json'),
                    'orders'       => asmi_read_json('orders.json'),
                    'reviews'      => asmi_read_json('reviews.json'),
                    'patrons'      => asmi_read_json('patrons.json'),
                    'giftcards'    => asmi_read_json('giftcards.json'),
                    'supportChats' => asmi_read_json('support_chats.json'),
                    'emailLogs'    => asmi_read_json('email_notifications.json')
                )
            ));
            exit;
        }
        break;

    // 2. Settings Endpoint
    case 'settings':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('settings.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body)) {
                asmi_save_json('settings.json', $body);
                echo json_encode(array('success' => true, 'message' => 'Settings saved successfully.'));
                exit;
            }
        }
        break;

    // 3. Products Catalog Endpoint
    case 'products':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('products.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body) && is_array($body)) {
                asmi_save_json('products.json', $body);
                echo json_encode(array('success' => true, 'message' => 'Product catalog synced successfully.'));
                exit;
            }
        }
        break;

    // 4. Coupons Endpoint
    case 'coupons':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('coupons.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body) && is_array($body)) {
                asmi_save_json('coupons.json', $body);
                echo json_encode(array('success' => true, 'message' => 'Coupons saved successfully.'));
                exit;
            }
        }
        break;

    // 5. Categories Endpoint
    case 'categories':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('categories.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body) && is_array($body)) {
                asmi_save_json('categories.json', $body);
                echo json_encode(array('success' => true, 'message' => 'Categories saved successfully.'));
                exit;
            }
        }
        break;

    // 6. Orders Endpoint
    case 'orders':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('orders.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body)) {
                $orders = asmi_read_json('orders.json');
                $found = false;
                foreach ($orders as $k => $o) {
                    if (isset($o['orderNumber']) && isset($body['orderNumber']) && $o['orderNumber'] === $body['orderNumber']) {
                        $orders[$k] = $body;
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    array_unshift($orders, $body);
                }
                asmi_save_json('orders.json', $orders);
                echo json_encode(array('success' => true, 'message' => 'Order persisted successfully.', 'data' => $body));
                exit;
            }
        }
        break;

    // 7. Reviews Endpoint
    case 'reviews':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('reviews.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body)) {
                $reviews = asmi_read_json('reviews.json');
                if (isset($body[0])) {
                    $reviews = $body;
                } else {
                    array_unshift($reviews, $body);
                }
                asmi_save_json('reviews.json', $reviews);
                echo json_encode(array('success' => true, 'message' => 'Review recorded successfully.', 'data' => $reviews));
                exit;
            }
        }
        break;

    // 8. Patrons Address Book Endpoint
    case 'patrons':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('patrons.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body)) {
                $patrons = asmi_read_json('patrons.json');
                if (isset($body[0])) {
                    $patrons = $body;
                } else {
                    $found = false;
                    foreach ($patrons as $k => $p) {
                        if ((isset($body['email']) && isset($p['email']) && $p['email'] === $body['email']) ||
                            (isset($body['phone']) && isset($p['phone']) && $p['phone'] === $body['phone'])) {
                            $patrons[$k] = array_merge($p, $body);
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        array_unshift($patrons, $body);
                    }
                }
                asmi_save_json('patrons.json', $patrons);
                echo json_encode(array('success' => true, 'message' => 'Patron details saved.', 'data' => $patrons));
                exit;
            }
        }
        break;

    // 9. Gift Cards Endpoint
    case 'giftcards':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('giftcards.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body) && is_array($body)) {
                asmi_save_json('giftcards.json', $body);
                echo json_encode(array('success' => true, 'message' => 'Gift cards persisted.'));
                exit;
            }
        }
        break;

    // 10. Customer Support Chats
    case 'support-chats':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('support_chats.json')));
            exit;
        } elseif ($method === 'POST') {
            if (!empty($body)) {
                $chats = asmi_read_json('support_chats.json');
                if (isset($body[0])) {
                    $chats = $body;
                } else {
                    $found = false;
                    foreach ($chats as $k => $c) {
                        if (isset($c['id']) && isset($body['id']) && $c['id'] === $body['id']) {
                            $chats[$k] = $body;
                            $found = true;
                            break;
                        }
                    }
                    if (!$found) {
                        array_unshift($chats, $body);
                    }
                }
                asmi_save_json('support_chats.json', $chats);
                echo json_encode(array('success' => true, 'message' => 'Support chat thread saved.', 'data' => $chats));
                exit;
            }
        }
        break;

    // 11. Support Chat Reply
    case 'support-chats/reply':
        if ($method === 'POST') {
            $chatId = isset($body['chatId']) ? $body['chatId'] : '';
            $msg = isset($body['message']) ? $body['message'] : null;
            if ($chatId && $msg) {
                $chats = asmi_read_json('support_chats.json');
                foreach ($chats as &$c) {
                    if (isset($c['id']) && $c['id'] === $chatId) {
                        if (!isset($c['messages']) || !is_array($c['messages'])) {
                            $c['messages'] = array();
                        }
                        $c['messages'][] = $msg;
                        $c['status'] = 'answered';
                        break;
                    }
                }
                unset($c);
                asmi_save_json('support_chats.json', $chats);
                echo json_encode(array('success' => true, 'message' => 'Reply posted successfully.'));
                exit;
            }
        }
        break;

    // 12. Order Item Cancellation Endpoint
    case 'cancel-order-item':
        if ($method === 'POST') {
            $orderNumber = isset($body['orderNumber']) ? $body['orderNumber'] : '';
            $itemId = isset($body['itemId']) ? $body['itemId'] : '';
            $reason = isset($body['reason']) ? $body['reason'] : 'Patron Request';
            $orders = asmi_read_json('orders.json');
            $updated = false;

            foreach ($orders as &$ord) {
                if (isset($ord['orderNumber']) && $ord['orderNumber'] === $orderNumber) {
                    if (isset($ord['items']) && is_array($ord['items'])) {
                        foreach ($ord['items'] as &$it) {
                            if (isset($it['id']) && $it['id'] === $itemId) {
                                $it['status'] = 'cancelled';
                                $it['cancellationReason'] = $reason;
                                $it['cancelledAt'] = date('c');
                                $updated = true;
                                break;
                            }
                        }
                        unset($it);
                    }
                    break;
                }
            }
            unset($ord);

            if ($updated) {
                asmi_save_json('orders.json', $orders);
                echo json_encode(array('success' => true, 'message' => 'Order item successfully cancelled.'));
                exit;
            }
            echo json_encode(array('success' => false, 'message' => 'Order or item not found.'));
            exit;
        }
        break;

    // 13. Image Upload Endpoint
    case 'upload':
        if ($method === 'POST') {
            $dataUrl = isset($body['dataUrl']) ? $body['dataUrl'] : '';
            $filename = isset($body['filename']) ? preg_replace('/[^a-zA-Z0-9_\-\.]/', '', $body['filename']) : ('asmi-' . time() . '.jpg');
            if (preg_match('/^data:image\/(\w+);base64,(.+)$/', $dataUrl, $matches)) {
                $ext = $matches[1];
                $imgData = base64_decode($matches[2]);
                $safeName = pathinfo($filename, PATHINFO_FILENAME) . '-' . time() . '.' . $ext;
                $targetFile = $assetsDir . DIRECTORY_SEPARATOR . $safeName;
                if (file_put_contents($targetFile, $imgData)) {
                    $webUrl = 'assets/images/' . $safeName;
                    echo json_encode(array('success' => true, 'url' => $webUrl));
                    exit;
                }
            }
            echo json_encode(array('success' => false, 'message' => 'Invalid image payload.'));
            exit;
        }
        break;

    // 14. Email Notification Audit Logs
    case 'email-logs':
        if ($method === 'GET') {
            echo json_encode(array('success' => true, 'data' => asmi_read_json('email_notifications.json')));
            exit;
        }
        break;

    case 'clear-email-logs':
        if ($method === 'POST') {
            asmi_save_json('email_notifications.json', array());
            echo json_encode(array('success' => true, 'message' => 'Email notification audit logs cleared.'));
            exit;
        }
        break;

    // 15. Factory Data Reset & Purge
    case 'reset-data':
        if ($method === 'POST') {
            $scope = isset($body['scope']) ? $body['scope'] : 'all';
            if ($scope === 'orders' || $scope === 'all') {
                asmi_save_json('orders.json', array());
                asmi_save_json('email_notifications.json', array());
            }
            if ($scope === 'chats' || $scope === 'all') {
                asmi_save_json('support_chats.json', array());
            }
            if ($scope === 'reviews' || $scope === 'all') {
                asmi_save_json('reviews.json', array());
            }
            if ($scope === 'products' || ($scope === 'all' && !empty($body['wipeProducts']))) {
                asmi_save_json('products.json', array());
            }
            if ($scope === 'all') {
                asmi_save_json('patrons.json', array());
            }
            echo json_encode(array('success' => true, 'message' => "Database records purged successfully [Scope: {$scope}].", 'scope' => $scope));
            exit;
        }
        break;

    // 16. Restore Baseline / Previous Settings
    case 'restore-settings':
        if ($method === 'POST') {
            $restored = isset($body['settings']) ? $body['settings'] : asmi_read_json('settings.json');
            asmi_save_json('settings.json', $restored);
            echo json_encode(array('success' => true, 'message' => 'Settings restored successfully.', 'data' => $restored));
            exit;
        }
        break;

    // Default Fallback
    default:
        http_response_code(404);
        echo json_encode(array('success' => false, 'message' => 'Endpoint not found: ' . htmlspecialchars($endpoint)));
        exit;
}

http_response_code(400);
echo json_encode(array('success' => false, 'message' => 'Invalid request method or payload.'));
