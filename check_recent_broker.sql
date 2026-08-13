-- Create Pratika's account with 999 coins
INSERT INTO users (phone, coins, created_at)
VALUES ('9004325226', 999, NOW())
ON CONFLICT (phone) DO UPDATE SET coins = 999;

-- Verify
SELECT id, phone, coins, created_at FROM users WHERE phone = '9004325226';
