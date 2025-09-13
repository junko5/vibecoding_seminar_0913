document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // リアルタイムバリデーション
        const requiredFields = ['name', 'email', 'message'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => validateField(fieldId));
                field.addEventListener('input', () => clearError(fieldId));
            }
        });
        
        // メールアドレスの特別なバリデーション
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', validateEmail);
        }
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // 全ての必須フィールドをバリデーション
    const requiredFields = [
        { id: 'name', message: 'お名前を入力してください。' },
        { id: 'email', message: '正しいメールアドレスを入力してください。' },
        { id: 'message', message: 'お問い合わせ内容を入力してください。' }
    ];
    
    requiredFields.forEach(field => {
        if (!validateField(field.id, field.message)) {
            isValid = false;
        }
    });
    
    // メールアドレスの形式チェック
    if (!validateEmail()) {
        isValid = false;
    }
    
    if (isValid) {
        // フォームが有効な場合の処理
        showSuccessMessage();
    } else {
        // エラーがある場合は最初のエラーフィールドにフォーカス
        const firstError = document.querySelector('.error-message[style*="block"]');
        if (firstError) {
            const fieldId = firstError.id.replace('Error', '');
            const field = document.getElementById(fieldId);
            if (field) {
                field.focus();
            }
        }
    }
}

function validateField(fieldId, customMessage = null) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    if (!value) {
        const message = customMessage || getDefaultErrorMessage(fieldId);
        showError(fieldId, message);
        return false;
    }
    
    clearError(fieldId);
    return true;
}

function validateEmail() {
    const emailField = document.getElementById('email');
    const email = emailField.value.trim();
    
    if (!email) {
        showError('email', 'メールアドレスを入力してください。');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', '正しいメールアドレスの形式で入力してください。');
        return false;
    }
    
    clearError('email');
    return true;
}

function getDefaultErrorMessage(fieldId) {
    const messages = {
        'name': 'お名前を入力してください。',
        'email': 'メールアドレスを入力してください。',
        'message': 'お問い合わせ内容を入力してください。'
    };
    
    return messages[fieldId] || 'この項目は必須です。';
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#dc3545';
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#e9ecef';
    }
}

function showSuccessMessage() {
    // 成功メッセージを表示
    const form = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
        padding: 1rem;
        border-radius: 5px;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
    `;
    successMessage.innerHTML = `
        <strong>✅ お問い合わせを受け付けました</strong><br>
        ご入力いただいたメールアドレス宛に確認メールをお送りします。<br>
        1〜2営業日以内に担当者よりご連絡いたします。
    `;
    
    // フォームの前に成功メッセージを挿入
    form.parentNode.insertBefore(successMessage, form);
    
    // フォームをリセット
    form.reset();
    
    // 成功メッセージまでスクロール
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 5秒後に成功メッセージを削除
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// ページ読み込み時のスムーズスクロール設定
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクにスムーズスクロールを適用（必要に応じて）
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// フォーカス時のスタイル改善
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#f8cce0';
            this.style.boxShadow = '0 0 0 2px rgba(248, 204, 224, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            if (this.style.borderColor !== '#dc3545') {
                this.style.borderColor = '#e9ecef';
                this.style.boxShadow = 'none';
            }
        });
    });
});