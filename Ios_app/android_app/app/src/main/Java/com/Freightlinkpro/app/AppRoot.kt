package com.freightlinkpro.app

import androidx.compose.material3.*
import androidx.compose.runtime.*

@Composable
fun AppRoot() {
    var tab by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                listOf("Loads", "Contracts", "Payment", "Profile").forEachIndexed { index, label ->
                    NavigationBarItem(
                        selected = tab == index,
                        onClick = { tab = index },
                        icon = {},
                        label = { Text(label) }
                    )
                }
            }
        }
    ) { _ ->
        when (tab) {
            0 -> Text("Loads")
            1 -> Text("Contracts")
            2 -> Text("Payment")
            else -> Text("Profile")
        }
    }
}
