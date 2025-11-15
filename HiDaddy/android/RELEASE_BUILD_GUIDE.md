# Release APK 빌드 가이드

## 1. gradle.properties 설정

파일 위치: `android/gradle.properties`

파일 맨 아래에 다음 내용 추가:

```properties
# Release signing config
MYAPP_RELEASE_STORE_FILE=hidaddy-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=hidaddy-key-alias
MYAPP_RELEASE_STORE_PASSWORD=hidaddy2024!
MYAPP_RELEASE_KEY_PASSWORD=hidaddy2024!
```

## 2. build.gradle 설정

파일 위치: `android/app/build.gradle`

### 2-1. signingConfigs 섹션에 release 추가

기존:
```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
}
```

수정 후:
```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
```

### 2-2. buildTypes의 release 섹션 수정

기존:
```gradle
release {
    // Caution! In production, you need to generate your own keystore file.
    // see https://reactnative.dev/docs/signed-apk-android.
    signingConfig signingConfigs.debug
    minifyEnabled enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
}
```

수정 후:
```gradle
release {
    signingConfig signingConfigs.release
    minifyEnabled enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
}
```

## 3. Release APK 빌드

터미널에서 실행:

```bash
cd HiDaddy/android
./gradlew assembleRelease
```

## 4. APK 파일 위치

빌드 성공 후 APK 파일은 다음 경로에 생성됩니다:

```
android/app/build/outputs/apk/release/app-release.apk
```

## 주요 파일 정보

- **Keystore 파일**: `android/app/hidaddy-release-key.keystore`
- **Keystore 비밀번호**: `hidaddy2024!`
- **Key Alias**: `hidaddy-key-alias`
- **Key 비밀번호**: `hidaddy2024!`

## 보안 주의사항

⚠️ **중요**: `gradle.properties`와 `build.gradle`의 서명 설정은 **절대 Git에 커밋하지 마세요!**

- Keystore 파일(`.keystore`)은 이미 `.gitignore`에 포함되어 있습니다
- 빌드 후에는 `git restore` 명령으로 설정 파일을 원래대로 되돌리는 것을 권장합니다:
  ```bash
  git restore android/app/build.gradle android/gradle.properties
  ```

## Debug APK vs Release APK

- **Debug APK**: 개발/테스트용, 크기가 크고 최적화 안됨
- **Release APK**: 배포용, 서명되고 최적화됨 (약 75MB)
- **AAB (Android App Bundle)**: Google Play Store 배포용 (필요시 `assembleRelease` 대신 `bundleRelease` 사용)
