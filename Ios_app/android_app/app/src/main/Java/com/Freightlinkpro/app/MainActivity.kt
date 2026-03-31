package com.freightlinkpro.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.stripe.android.PaymentConfiguration

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        PaymentConfiguration.init(
            applicationContext,
            "pk_live_REPLACE_WITH_YOUR_STRIPE_PUBLISHABLE_KEY"
        )

        setContent {
            AppRoot()
        }
    }
}
